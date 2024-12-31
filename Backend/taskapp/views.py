from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TaskSerializer, TeamSerializer,ProjectSerializer,InvitationSerializer,NotificationSerializer
from accounts.serializers import UserSerializer
from .models import Task,Team,Project,Invitation,Notification
from accounts.models import User
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from datetime import datetime,date
from django.db.models import Q
from django.conf import settings

# Create your views here.


class CreateProjectView(APIView):
    def post(self, request:Request):
        data = request.data
        members_id = data.get('assigned_members')
        members = []
        for id in members_id:
            user = User.objects.get(**id)
            members.append(user)
        
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            serializer.validated_data['assigned_members'] = members
            serializer.validated_data['status'] = "In Progress"    
            project = serializer.save(user=request.user)
            notification = Notification.objects.create(user=request.user,message=f'You Created {project.name} Project')
            notification.save()
            for user in members:
                notification = Notification.objects.create(user=user,message=f'{request.user.username} assigned you to a {project.name} Project')
                notification.save()
            user = User.objects.get(id=request.user.id)
            project.assigned_members.add(request.user)
            project.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
              
            
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ListProjectView(APIView):
    def get(self,request:Request):
        try:
            team = Team.objects.get(members=request.user)
            projects = Project.objects.filter( Q(assigned_members=request.user) | Q(user=request.user) ).distinct()
            serializer = ProjectSerializer(projects,many=True)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            projects = Project.objects.filter( user=request.user ).distinct()
            serializer = ProjectSerializer(projects,many=True)
            return Response(data=serializer.data,status=status.HTTP_200_OK)

class DetailProjectView(APIView):
    def get(self,request:Request,pk):
        project = Project.objects.get(pk=pk)
        task = Task.objects.filter(project=project)
        taskSerializer = TaskSerializer(task,many=True)
        projectSerializer = ProjectSerializer(project)
        response = {
            'project':projectSerializer.data,
            'task':taskSerializer.data
        }
        return Response(data=response,status=status.HTTP_200_OK)


class CreateTaskView(APIView):
    def post(self,request:Request):
        data = request.data
        projectId = data.get('project')
        members_id = data.get('assigned_members')
        checked = data.get('checked')
        
        members = []
        for id in members_id:
            user = User.objects.get(**id)
            members.append(user)
        if projectId is None :
           
            project,created = Project.objects.get_or_create(name='Personal Tasks',status="In Progress",user=request.user)
            serializer = TaskSerializer(data=data)
            if serializer.is_valid():
                serializer.validated_data['status'] = "In Progress"
                serializer.validated_data['project'] = project
                task = serializer.save(user=request.user)
                user = User.objects.get(id=request.user.id)
                task.assigned_members.add(user)
                task.save()
                return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        else:
            serializer = TaskSerializer(data=data)
            if serializer.is_valid():
                serializer.validated_data['assigned_members'] = members
                serializer.validated_data['status'] = "In Progress"
                task = serializer.save(user=request.user)
                for user in members:
                    notification = Notification.objects.create(user=user,message=f'{request.user.username} assigned you to a task in the {task.project.name} project')
                    notification.save()
                if checked == True:
                    user = User.objects.get(id=request.user.id)
                    task.assigned_members.add(user)
                    task.save()
                return Response(data=serializer.data,status=status.HTTP_201_CREATED)    
        return Response(data = serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class ListTaskView(APIView):
    def get(self, request:Request):
        task = Task.objects.filter(assigned_members = request.user)
        serializer = TaskSerializer(instance=task,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    


class OnlineTeamMembersView(APIView):
    def get(self, request:Request):
        try:
            team = Team.objects.get(members=request.user)
            users = User.objects.filter(is_online=True)
            data =[][:4]
            for user in users:
                if user in team.members.all():
                    data.append({
                        'username': user.username,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'email': user.email,
                        'is_online': user.is_online
                    })

            serializer = UserSerializer(instance=data, many=True) 
            response = {
                'user':serializer.data,
                'team':True
            }
            return Response(data=response,status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            response = {
                'user':'No Team Members',
                'team':False
            }
            return Response(data=response,status=status.HTTP_200_OK)

class TodaysDueTaskView(APIView):
    def get(self,request:Request):
        dates =  date.today()
        task = Task.objects.filter(assigned_members=request.user,due_date=dates)[:5]
        serializer = TaskSerializer(instance=task,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class StatusOfTasks(APIView):
    def get(self,request:Request):
        all = Task.objects.filter(assigned_members = request.user)
        completed = Task.objects.filter(assigned_members = request.user,status="Completed") 
        pending = Task.objects.filter(assigned_members = request.user,status="Pending") 
        in_progress = Task.objects.filter(assigned_members = request.user,status="In Progress") 
        all_serializer = TaskSerializer(all,many=True)
        completed_serializer = TaskSerializer(completed,many=True)
        pending_serializer = TaskSerializer(pending,many=True)
        in_progress_serializer = TaskSerializer(in_progress,many=True)
        response = {
            'all':all_serializer.data,
            'completed': completed_serializer.data,
            'pending':pending_serializer.data,
            'in_progress':in_progress_serializer.data 
        }
        return Response(data=response,status=status.HTTP_200_OK)
    

class TeamMembers(APIView):
    def get(self, request:Request):
        try:
            team = Team.objects.get(members=request.user)
            serializer = TeamSerializer(team)
            response = {
                'user':serializer.data,
                'team':True
            }
            return Response(data=response,status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            response = {
                'user':'No Team Members',
                'team':False
            }
            return Response(data=response,status=status.HTTP_200_OK)
        
class CompleteTaskView(APIView):
    def put(self, request:Request,pk):
        data = request.data
        task = Task.objects.get(pk=pk)
        complete = data.get('complete')
        projectId = data.get('projectId')
        project = Project.objects.get(pk=projectId)
        serializer = TaskSerializer(instance=task,data=data,partial=True)
        if serializer.is_valid():
            if complete == True:
                serializer.validated_data['completed'] = True
                serializer.validated_data['status'] = 'Completed'
                task = serializer.save()
                for user in task.assigned_members.all():
                    notification = Notification.objects.create(user=user,message=f'You Completed a Task in the {project.name} Project')
                    notification.save()
                return Response(data=serializer.data,status=status.HTTP_200_OK)
            else:
                serializer.validated_data['completed'] = False
                serializer.validated_data['status'] = 'In Progress'
                serializer.save()
                return Response(data=serializer.data,status=status.HTTP_200_OK)            
        return Response(data = serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class SendInvitationView(APIView):
    def post(self,request:Request):
        data = request.data
        email = data.get('email')
        try:
            receiver = User.objects.get(email=email)
            try:
                team = Team.objects.get(members=receiver)
                try:
                    team  = Team.objects.get(Q(leader=request.user) | Q(members=receiver))
                    
                    response = {
                            'message':'User is in your team'
                        }
                    return Response(data=response,status=status.HTTP_200_OK)
                except Team.DoesNotExist:
                    response = {
                            'message':'User is in another team'
                        }
                    return Response(data=response,status=status.HTTP_200_OK)
                
            except Team.DoesNotExist:
                sender = request.user
                serializer = InvitationSerializer(data=data)
                if serializer.is_valid():
                    serializer.validated_data['sender'] = sender
                    serializer.validated_data['receiver'] = receiver
                    serializer.save()
                    notification = Notification.objects.create(user=receiver,message=f'{sender.username} invited you to join his Team(Workspace)')
                    notification.save()
                    response = {
                        'message':'Invitation sent Successfully'
                    }
                return Response(data=response,status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            response = {
                'message':'User wih ths Email Address does not exist'
            } 
            return Response(data=response,status=status.HTTP_200_OK)

class ResponseToInvitationView(APIView):
    def put(self, request: Request,pk):
        data =request.data
        accepted = data.get('accepted')
        invitation = Invitation.objects.get(pk=pk)
        sender_id = data.get('sender')
        sender = User.objects.get(id=sender_id)
        if accepted is True:
            serializer = InvitationSerializer(instance=invitation,data=data,partial=True)
            if serializer.is_valid():        
                team = Team.objects.get(Q(leader=sender) | Q(members=sender))
                team.members.add(request.user)
                team.save()
                serializer.validated_data['responded'] = True
                serializer.validated_data['status'] = 'Accepted'
                serializer.save()
                notification = Notification.objects.create(user=request.user,message=f'You Accepted {sender.username} invitation')
                notification.save()
                notification = Notification.objects.create(user=sender,message=f'{request.user.username} Accepted your invite')
                notification.save()
                response = {
                    'accepted': 'You Accepted the invite'
                }
                return Response(data=response,status=status.HTTP_200_OK)
        else:
            serializer = InvitationSerializer(instance=invitation,data=data,partial=True)
            if serializer.is_valid():
                serializer.validated_data['responded'] = True
                serializer.validated_data['status'] = 'Declined'
                serializer.save()
                notification = Notification.objects.create(user=request.user,message=f'You Rejected {sender.username} invitation')
                notification.save()
                notification = Notification.objects.create(user=sender,message=f'{request.user.username} Rejected your invite')
                notification.save()
            response = {
                'rejected':'You Rejected the Invite'
            }
            return Response(data=response,status=status.HTTP_200_OK, )
        
class UserInvitationView(APIView):
    def get(self, request:Request):
        invitations = Invitation.objects.filter(receiver=request.user)
        serializer = InvitationSerializer(invitations,many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class NotificationView(APIView):
    def get(self,request:Request):
        notification = Notification.objects.filter(user=request.user)
        serializer = NotificationSerializer(notification,many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class UnReadNotificationView(APIView):
    def get(self,request:Request):
        notification = Notification.objects.filter(user=request.user,read=False)
        serializer = NotificationSerializer(notification,many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)   

class MarkAsReadView(APIView):
    def put(self, request:Request,pk):
        
        data = request.data
        notification = Notification.objects.get(pk=pk)
        serializer = NotificationSerializer(instance=notification,data=data,partial=True)
        if serializer.is_valid():
            serializer.validated_data['read'] = True
            serializer.save()
            response = {
            'Read':'Notification Read'
            }
            return Response(data=response,status=status.HTTP_200_OK, )   
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class MarkAllAsReadView(APIView):
    def post(self, request:Request):
        notifications = Notification.objects.filter(user=request.user,read=False)
        for notification in notifications:
            notification.read = True
            notification.save()
            response = {
            'Read':'All Notification Read'
        }
        return Response(data=response,status=status.HTTP_200_OK, )
    
 

class Profile(APIView):
    pass                  
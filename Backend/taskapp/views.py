import random
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TaskSerializer, TeamSerializer,ProjectSerializer,InvitationSerializer,NotificationSerializer,WorkSpaceSerializer
from accounts.serializers import ProfileSerializer, UserSerializer
from .models import Task,Team,Project,Invitation,Notification,WorkSpace
from accounts.models import Profile, User
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from datetime import datetime,date, timedelta
from django.db.models import Q
from django.conf import settings
from django.utils import timezone

# Create your views here.


class CreateWorkSpace(APIView):
    def post(self, request:Request):
        data = request.data
        serializer = WorkSpaceSerializer(data=data)
        if serializer.is_valid():
            serializer.validated_data['owner']=request.user
            space_id = random.randint(10001,99999)
            serializer.validated_data['space_id'] = space_id
            workspace = serializer.save()
            workspace.name = f"{workspace.name}'s Workspace"
            workspace.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        return Response(data = serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class SwitchWorkspace(APIView):
    def post(self,request:Request):
        data = request.data
        last_workspace_id = data.get('last_workspace')        
        new_workspace_id = data.get('new_workspace')
        last_workspace = WorkSpace.objects.get(id=last_workspace_id)
        last_workspace.active.remove(request.user)
        last_workspace.save()
        new_workspace = WorkSpace.objects.get(id=new_workspace_id)
        new_workspace.active.add(request.user)
        new_workspace.save()
        response = {
            'message':'Workspace Switched Successfully'
        }
        return Response(data=response,status=status.HTTP_200_OK)

class UserWorkSpace(APIView):
    def get(self,request:Request):
        user_workspaces = WorkSpace.objects.filter(Q(owner=request.user)| Q(team__members=request.user)).distinct()
        active_workspace = WorkSpace.objects.filter(Q(owner=request.user)| Q(team__members=request.user),active = request.user)[0]
        user_workspaces_serializer = WorkSpaceSerializer(user_workspaces,many=True)
        active_workspace_serializer = WorkSpaceSerializer(active_workspace)
        response = {
            "workspaces":user_workspaces_serializer.data,
            "active":active_workspace_serializer.data,
        }
        return Response(data=response,status=status.HTTP_200_OK)

class CreateProjectView(APIView):
    def post(self, request:Request):
        data = request.data
        members_id = data.get('assigned_members')
        # space_id = data.get('space_id')
        members = []
        for id in members_id:
            user = User.objects.get(**id)
            members.append(user)
        
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            # workspace = WorkSpace.objects.get(owner=request.user,space_id=space_id)
            workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
            serializer.validated_data['workspace'] = workspace
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
        # space_id = request.query_params.get('space_id')
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
        try:
            team = Team.objects.get(members=request.user,workspace=workspace)
            workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
            projects = Project.objects.filter( Q(assigned_members=request.user) | Q(user=request.user),workspace= workspace).distinct()      
            serializer = ProjectSerializer(projects,many=True) 
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            projects = Project.objects.filter( user=request.user,workspace= workspace ).distinct()
            serializer = ProjectSerializer(projects,many=True)
            return Response(data=serializer.data,status=status.HTTP_200_OK)

class AddUserToProject(APIView):
    def put(self,request:Request,pk):
        data = request.data
        name= data.get('param')
        project = Project.objects.get(id=pk)
        serializer = ProjectSerializer(instance=project,data=data,partial=True)
        if serializer.is_valid():
            updated_project = serializer.save()
            try:
                user = User.objects.get(Q(username=name) | Q(email=name))
                try:
                    workspace = WorkSpace.objects.get(id=project.workspace.id)
                    team = Team.objects.get(id=workspace.team.id,members=user)
                    updated_project.assigned_members.add(user)
                    updated_project.save()
                    response = {
                        'message':'User Added'
                    }
                except Team.DoesNotExist:
                    response = {
                        'message':'User not in your Team'
                    }
            except User.DoesNotExist:
                if ".com" in name  or "@" in name or "gmail" in name:
                    response = {
                        'message':'User with this email address does not exist'
                    }
                else:
                    response = {
                        'message':'User with this Username does not exist'
                    }        
                
            return Response(data=response,status=status.HTTP_200_OK)
        return Response(data = serializer.errors,status=status.HTTP_400_BAD_REQUEST)




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

class DeleteProject(APIView):
    def delete(Self,request,pk):
        try:
            project= Project.objects.get(id=pk)
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)


class CreateTaskView(APIView):
    def post(self,request:Request):
        data = request.data
        projectId = data.get('project')
        members_id = data.get('assigned_members')
        checked = data.get('checked')
        space_id = data.get('space_id')
        members = []
        for id in members_id:
            user = User.objects.get(**id)
            members.append(user)
        if projectId is None :
           
            project,created = Project.objects.get_or_create(name='Personal Tasks',status="In Progress",user=request.user)
            serializer = TaskSerializer(data=data)
            if serializer.is_valid():
                # workspace = WorkSpace.objects.get(owner=request.user,space_id=space_id)
                workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
                serializer.validated_data['workspace'] = workspace
                serializer.validated_data['status'] = "In Progress"
                serializer.validated_data['project'] = project
                task = serializer.save(user=request.user)
                user = User.objects.get(id=request.user.id)
                task.assigned_members.add(user)
                task.save()
                project.assigned_members.add(user)
                project.workspace = workspace
                project.save()
                return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        else:
            serializer = TaskSerializer(data=data)
            if serializer.is_valid():
                # workspace = WorkSpace.objects.get(owner=request.user,space_id=space_id)
                workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
                serializer.validated_data['workspace'] = workspace
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
        space_id = request.query_params.get('space_id')
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
        task = Task.objects.filter(assigned_members = request.user,workspace=workspace)
        serializer = TaskSerializer(instance=task,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
class DeleteTask(APIView):
    def delete(Self,request,pk):
        try:
            task= Task.objects.get(id=pk)
            task.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)

class TodaysDueTaskView(APIView):
    def get(self,request:Request):
        space_id = request.query_params.get('space_id')
        dates =  date.today()
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
        task = Task.objects.filter(assigned_members=request.user,due_date=dates,workspace=workspace)[:5]
        serializer = TaskSerializer(instance=task,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class StatusOfTasks(APIView):
    def get(self,request:Request):
        space_id = request.query_params.get('space_id')
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[0]
        all = Task.objects.filter(assigned_members = request.user,workspace=workspace)
        completed = Task.objects.filter(assigned_members = request.user,status="Completed",workspace=workspace) 
        project = Project.objects.filter(assigned_members = request.user,workspace=workspace) 
        in_progress = Task.objects.filter(assigned_members = request.user,status="In Progress",workspace=workspace) 
        team = Team.objects.get(id=workspace.team.id)
        today = timezone.now()
        range_days = 5
        start_date = today 
        end_date = today + timedelta(days=range_days)
        upcoming_deadlines = Task.objects.filter(due_date__range=(start_date,end_date),assigned_members = request.user,workspace=workspace)[:5]
        all_serializer = TaskSerializer(all,many=True)
        upcoming_deadlines_serializer = TaskSerializer(upcoming_deadlines,many=True)
        completed_serializer = TaskSerializer(completed,many=True)
        project_serializer = ProjectSerializer(project,many=True)
        in_progress_serializer = TaskSerializer(in_progress,many=True)
        team_serializer = TeamSerializer(team)
        response = {
            'all':all_serializer.data,
            'completed': completed_serializer.data,
            'projects':project_serializer.data,
            'in_progress':in_progress_serializer.data ,
            'upcoming':upcoming_deadlines_serializer.data,
            "team":team_serializer.data,
        }
        return Response(data=response,status=status.HTTP_200_OK)
    

class TeamMembers(APIView):
    def get(self, request:Request):
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
        team = Team.objects.get(id=workspace.team.id)
        serializer = TeamSerializer(instance=team)            
        return Response(data=serializer.data,status=status.HTTP_200_OK)

class LeaveTeam(APIView):
    def put(self,request:Request,pk):
        data = request.data
        member_id = data.get('member_id')
        leader_id = data.get('leader_id')
        remove = data.get('remove')
        user = User.objects.get(id=member_id)
        leader = User.objects.get(id=leader_id)
        team = Team.objects.get(id=pk)
        serializer = TeamSerializer(instance=team,data=data,partial=True)
        workspace = WorkSpace.objects.get(team=team)
        
        if serializer.is_valid():
            updated_team = serializer.save()
            updated_team.members.remove(user)
            updated_team.save()
            projects = Project.objects.filter(workspace=workspace,assigned_members=user)
            for project in projects:
                tasks = Task.objects.filter(project=project,assigned_members=user)
                for task in tasks:
                    task.assigned_members.remove(user)
                    task.save()
                project.assigned_members.remove(user) 
                project.save()    
            if user in  workspace.active.all():
                workspace.active.remove(user)
                workspace.save()
                user_workspace = WorkSpace.objects.get(owner=user,main=True)
                user_workspace.active.add(user)
                user_workspace.save()
                if remove == False:
                    notification1 = Notification.objects.create(user=user,message=f'You left {workspace.name}')
                    notification2 = Notification.objects.create(user=leader,message=f'{user.username} left {workspace.name}')
                    notification1.save()
                    notification2.save()
                else:
                    notification1 = Notification.objects.create(user=user,message=f'{request.user.username} removed you from {workspace.name}')
                    notification2 = Notification.objects.create(user=leader,message=f'You removed {user.username} from {workspace.name}')
                    notification1.save()
                    notification2.save()    

            return Response(data=serializer.data,status=status.HTTP_200_OK)
        return Response(data = serializer.errors,status=status.HTTP_400_BAD_REQUEST)


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
        space_id = data.get('space_id')
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()

        try:
            receiver = User.objects.get(email=email)
            try:
                team = Team.objects.get(members=receiver,id=workspace.team.id)
                try:
                    
                    team  = Team.objects.get(Q(leader=request.user) | Q(members=receiver),id=workspace.team.id)
                    
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
                    # workspace = WorkSpace.objects.get(owner=request.user,space_id=space_id)
                    workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
                    serializer.validated_data['workspace'] = workspace
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
        workspace_id = data.get('workspace')
        active_workspace_id = data.get('active')
        sender = User.objects.get(id=sender_id)
        if accepted is True:
            serializer = InvitationSerializer(instance=invitation,data=data,partial=True)
            if serializer.is_valid():
                serializer.validated_data['responded'] = True
                serializer.validated_data['status'] = 'Accepted'
                serializer.save()
                workspace = WorkSpace.objects.get(id=workspace_id)        
                team = Team.objects.get(id=workspace.team.id)
                team.members.add(request.user)
                team.save()
                active_workspace = WorkSpace.objects.get(id=active_workspace_id)
                active_workspace.active.remove(request.user)
                active_workspace.save()
                workspace.active.add(request.user) 
                workspace.save()
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
        space_id = request.query_params.get('space_id')
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
        invitations = Invitation.objects.filter(receiver=request.user)
        serializer = InvitationSerializer(invitations,many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class NotificationView(APIView):
    def get(self,request:Request):
        space_id = request.query_params.get('space_id')
        workspace = WorkSpace.objects.filter(Q(owner=request.user) | Q(team__members = request.user),active=request.user)[:1].get()
        notification = Notification.objects.filter(user=request.user)
        serializer = NotificationSerializer(notification,many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class UnReadNotificationView(APIView):
    def get(self,request:Request):
        space_id = request.query_params.get('space_id')
        
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
        return Response(data=response,status=status.HTTP_200_OK)
    
 


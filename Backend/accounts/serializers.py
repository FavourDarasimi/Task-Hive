from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','is_online','full_name']

    def get_full_name(self,obj):
        name = obj.first_name + ' ' + obj.last_name
        return name    


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email', 'password','is_online' ]

    def create(self,validated_data):
        password = validated_data['password']
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user    
    
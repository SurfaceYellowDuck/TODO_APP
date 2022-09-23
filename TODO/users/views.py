from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import UserProfile
from .serializers import UserProfileModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileModelSerializer

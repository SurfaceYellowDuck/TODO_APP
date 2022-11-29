from rest_framework.serializers import HyperlinkedModelSerializer
from .models import UserProfile


class UserProfileModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserProfileModelSerializer010(HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'if_superuser']

from rest_framework.serializers import HyperlinkedModelSerializer
from .models import UserProfile


class UserProfileModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'email']
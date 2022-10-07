from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import UserProfile
from .serializers import UserProfileModelSerializer
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin


class UserListRetrieveViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


# class UserModelViewSet(ModelViewSet):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileModelSerializer

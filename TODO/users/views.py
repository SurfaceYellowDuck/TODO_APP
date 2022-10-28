from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import UserProfile
from .serializers import UserProfileModelSerializer, UserProfileModelSerializer010
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin


class UserListRetrieveViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = UserProfile.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.1.0':
            return UserProfileModelSerializer010
        return UserProfileModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]



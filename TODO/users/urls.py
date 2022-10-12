from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserListRetrieveViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
app_name = 'users'

router = DefaultRouter()
# router.register('users', UserModelViewSet)
router.register('users_custom', UserListRetrieveViewSet)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),

]

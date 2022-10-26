import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserListRetrieveViewSet
from .models import UserProfile


class TestUsersListViewSet(TestCase):
    def test_get_detail_user_info(self):
        user_obj = UserProfile.objects.create(
            username="user1",
            first_name="Alex",
            last_name="",
            email="user1@mail.ru"
        )
        client = APIClient(enforce_csrf_checks=True)
        response = client.get(f'api/users/{user_obj.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_users_list(self):
        factory = APIRequestFactory(enforce_csrf_checks=True)
        request = factory.get('/api/users/')
        view = UserListRetrieveViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

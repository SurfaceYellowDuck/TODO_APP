import json
import os

from django.core.management.base import BaseCommand
from users.models import UserProfile


def load_from_json(file_name, JSON_PATH='users/jsons'):
    with open(os.path.join(JSON_PATH, file_name + '.json'), mode='r', encoding='UTF-8') as infile:

        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = load_from_json('users')
        for user in users:
            new_user = UserProfile(**user)
            new_user.save()

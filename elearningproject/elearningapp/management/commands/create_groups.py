from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Creates the necessary groups for the application'

    def handle(self, *args, **options):
        groups = ['Students', 'Teachers']
        for group_name in groups:
            Group.objects.get_or_create(name=group_name)
            self.stdout.write(self.style.SUCCESS(f'Successfully created group "{group_name}"'))

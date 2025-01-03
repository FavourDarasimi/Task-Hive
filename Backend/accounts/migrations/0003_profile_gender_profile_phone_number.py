# Generated by Django 5.0.1 on 2025-01-03 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='gender',
            field=models.CharField(choices=[('male', 'MALE'), ('female', 'FEMALE')], default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='phone_number',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]

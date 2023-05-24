# Generated by Django 4.2.1 on 2023-05-20 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lecture', '0006_alter_lecture_created_at_alter_register_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='lecture',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='register',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='score',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='test',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
import graphene
from graphene_django import DjangoObjectType
from .models import Lecture, Register
from graphene_django.filter import DjangoFilterConnectionField
from graphene import relay
from graphql_relay import from_global_id
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User


class LectureNode(DjangoObjectType):
    class Meta:
        model = Lecture
        filter_fields = {
          'title': ['exact', 'icontains', 'istartswith'],
          'description': ['exact', 'icontains'],
          'lecture_image_url': ['exact', 'icontains'],
          'lecture_video_element': ['exact', 'icontains'],
          'author': ['exact', 'icontains'],
        }
        interfaces = (relay.Node, )

class RegisterNode(DjangoObjectType):
    class Meta:
        model = Register
        filter_fields = {
          'lecture': ['exact'],
          'user': ['exact'],
          'is_completed': ['exact'],
        }
        interfaces = (relay.Node, )

class RegisterCreateMutation(relay.ClientIDMutation):
    class Input:
        user_id = graphene.ID(required=True)
        lecture_id = graphene.ID(required=True)

    registration = graphene.Field(RegisterNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        user = User(id=from_global_id(input.get('user_id'))[1])
        lecture = Lecture(id=from_global_id(input.get('lecture_id'))[1])
        registration = Register(user=user, lecture=lecture , is_completed=False)
        registration.save()
        return RegisterCreateMutation(registration=registration)

class RegisterDeleteMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    registration = graphene.Field(RegisterNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        registration = Register(id=from_global_id(input.get('id'))[1])
        registration.delete()
        return RegisterDeleteMutation(department=None)

class Mutation:
    create_register = RegisterCreateMutation.Field()
    delete_register = RegisterDeleteMutation.Field()


class Query(graphene.ObjectType):
    registration = graphene.Field(RegisterNode, id=graphene.NonNull(graphene.ID))
    lecture = graphene.Field(LectureNode, id=graphene.NonNull(graphene.ID))
    all_lectures = DjangoFilterConnectionField(LectureNode)
    all_registrations = DjangoFilterConnectionField(RegisterNode)

    @login_required
    def resolve_register(self, info, **kwargs):
      id = kwargs.get('id')
      if id is not None:
        return Register.objects.get(id=from_global_id(id)[1])

    def resolve_lecture(self, info, **kwargs):
      id = kwargs.get('id')
      if id is not None:
        return Lecture.objects.get(id=from_global_id(id)[1])

    @login_required
    def resolve_all_registers(self, info, **kwargs):
      return Register.objects.all()

    def resolve_all_lectures(self, info, **kwargs):
      return Lecture.objects.all()

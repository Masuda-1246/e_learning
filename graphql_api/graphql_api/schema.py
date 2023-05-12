import graphene
import users.schema
import lecture.schema

class Query(users.schema.Query, lecture.schema.Query, graphene.ObjectType):
  pass

class Mutation(users.schema.Mutation, lecture.schema.Mutation, graphene.ObjectType):
  pass

schema = graphene.Schema(query=Query, mutation=Mutation)
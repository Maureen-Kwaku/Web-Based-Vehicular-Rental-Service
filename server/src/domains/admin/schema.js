const gql = require('apollo-server-express').gql;

module.exports = gql`
  type Admin {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    # isBlocked: Boolean!
    # blocked: BlockedType
    createdBy: Admin!
    createdAt: Date!
    updatedAt: Date!
  }

  # type BlockedType {
  #   by: Admin
  #   at: Date
  # }
  input CreateAdminInput {
    name: String!
    email: String!
    phone: String!
  }
  input UpdateAdminInput {
    adminId: ID!
    block: Boolean!
  }
  input GetAdminsFilter {
    name: String
    email: String
    phone: String
    dateRange: DateRangeInput
    search: String
    orderBy: String
    order: DocumentOrder
  }
  input GetAdminFilter {
    adminId: ID!
  }
  input DeleteAdminInput {
    adminId: ID!
  }
  input LoginAdminInput {
    email: String!
    password: String!
  }
  input UpdateAdminPasswordInput {
    oldPassword: String!
    newPassword: String!
  }
  type AdminAuth {
    admin: Admin
    token: String
  }
  input ExportAdminsInput {
    format: DocumentFormat
    filter: GetAdminsFilter
    fields: [String]
  }
  input SendAdminCodeInput {
    email: String!
  }
  input ResendAdminCodeInput {
    adminId: ID!
  }
  input ResetAdminPasswordInput {
    adminId: ID!
    code: String!
    password: String!
  }
  extend type Query {
    admin(filter: GetAdminFilter = {}): Admin!
    admins(filter: GetAdminsFilter = {}, pagination: Pagination): [Admin]!
    adminsLength(filter: GetAdminsFilter = {}): Int!
  }
  extend type Mutation {
    createAdmin(input: CreateAdminInput!): Admin!
    updateAdmin(input: UpdateAdminInput!): Admin!
    deleteAdmin(input: DeleteAdminInput!): Boolean!
    exportAdmins(input: ExportAdminsInput): String!
    loginAdmin(input: LoginAdminInput!): AdminAuth!
    updateAdminPassword(input: UpdateAdminPasswordInput!): Boolean!
    sendAdminCode(input: SendAdminCodeInput!): Admin!
    resendAdminCode(input: ResendAdminCodeInput!): Admin!
    resetAdminPassword(input: ResetAdminPasswordInput!): Boolean!
  }
`;

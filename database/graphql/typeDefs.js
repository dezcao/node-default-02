module.exports =  `
  type USER {
    user_id: ID
    email: String
    id: String
    nickname: String
    birthdate: String
    addr: String
    gender: String
    created: String
    img: IMG
  }
  type HOSPITAL {
    id: ID
    telephone: String
    open: String
    close: String
    lunch: String
    holiday: String
    img: IMG
    name: String
    addr: String
    rating: String
    review: Int
    created: String
  }
  type PROMOTION {
    id: ID
    type_id: String
    title: String
    name: String
    start: String
    end: String
    img: IMG
  }
  type POST {
    id: ID
    type_id: String
    title: String
    content: String
    watch_cnt: Int
    like_cnt: Int
    comment_cnt: Int
    comments: [COMMENT]
    img: [IMG]
    user: USER
    created: String
  }
  type COMMENT {
    id: ID
    post_id: String
    parent_id: String
    content: String
    like_cnt: Int
    user: USER
    recomments: [COMMENT]
    created: String
  }
  type IMG {
    id: ID
    type_id: String
    created: String
  }
  type HASH_TAG {
    id: ID
    type_id: String
    table_type: String
    category: String
    tag: String
    created: String
    posts: [POST]
  }
  
  type Query {
    users: [USER]
    user(id: ID): USER
    hospital(id: ID!): HOSPITAL
    post(id: ID!): POST

    hospitals(tag: String): [HOSPITAL]        
    posts(tag: String): [POST]
    promotions(tag: String): [PROMOTION]
  }
  type Mutation {
    post(nickname: String!, addr: String!): USER!
  }
`;

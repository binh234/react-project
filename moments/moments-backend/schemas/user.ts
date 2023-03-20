import {Rule} from '@sanity/types'

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      // validation: (Rule: Rule) =>
      //   Rule.required().custom(async (email: string, context: any) => {
      //     // Check if email already exists in the database
      //     const existingUser = await context.documentStore.dataSource.findOne(
      //       'user',
      //       `*[_type == "user" && email == $email][0]`,
      //       {email}
      //     )
      //     if (existingUser) {
      //       return 'Email already exists'
      //     }
      //     return true
      //   }),
    },
  ],
}

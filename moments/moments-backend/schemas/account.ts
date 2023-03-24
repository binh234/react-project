import {Rule} from '@sanity/types'

export default {
  name: 'account',
  title: 'Account',
  type: 'document',
  fields: [
    {
      name: 'provider',
      title: 'Provider',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'access_token',
      title: 'Access Token',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'exp',
      title: 'Expires at',
      type: 'int',
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
}

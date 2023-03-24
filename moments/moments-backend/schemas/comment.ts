import {Rule} from 'sanity'

export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'userName',
      title: 'userName',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
  ],
}

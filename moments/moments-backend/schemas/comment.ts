export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      validation: (Rule: any) => Rule.required(),
    }
  ],
}

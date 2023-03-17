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
  ],
}

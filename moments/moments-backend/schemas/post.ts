export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'string',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'comment'}],
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsletterContent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TemplateKeyId] [int] NOT NULL,
	[NewsletterId] [int] NOT NULL,
	[Value] [nvarchar](4000) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
 CONSTRAINT [PK_NewsletterContent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[NewsletterContent] ADD  CONSTRAINT [DF_NewsletterContent_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[NewsletterContent] ADD  CONSTRAINT [DF_NewsletterContent_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[NewsletterContent]  WITH CHECK ADD  CONSTRAINT [FK_NewsletterContent_Newsletters] FOREIGN KEY([NewsletterId])
REFERENCES [dbo].[Newsletters] ([Id])
GO
ALTER TABLE [dbo].[NewsletterContent] CHECK CONSTRAINT [FK_NewsletterContent_Newsletters]
GO
ALTER TABLE [dbo].[NewsletterContent]  WITH CHECK ADD  CONSTRAINT [FK_NewsletterContent_NewsletterTemplateKeys] FOREIGN KEY([TemplateKeyId])
REFERENCES [dbo].[NewsletterTemplateKeys] ([Id])
GO
ALTER TABLE [dbo].[NewsletterContent] CHECK CONSTRAINT [FK_NewsletterContent_NewsletterTemplateKeys]
GO

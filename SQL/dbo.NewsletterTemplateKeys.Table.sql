GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsletterTemplateKeys](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[KeyTypeId] [int] NOT NULL,
	[TemplateId] [int] NOT NULL,
	[KeyName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_NewsletterTemplateKeys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[NewsletterTemplateKeys]  WITH CHECK ADD  CONSTRAINT [FK_NewsletterTemplateKeys_NewletterTemplates] FOREIGN KEY([TemplateId])
REFERENCES [dbo].[NewsletterTemplates] ([Id])
GO
ALTER TABLE [dbo].[NewsletterTemplateKeys] CHECK CONSTRAINT [FK_NewsletterTemplateKeys_NewletterTemplates]
GO
ALTER TABLE [dbo].[NewsletterTemplateKeys]  WITH CHECK ADD  CONSTRAINT [FK_NewsletterTemplateKeys_NewsletterKeyTypes] FOREIGN KEY([KeyTypeId])
REFERENCES [dbo].[NewsletterKeyTypes] ([Id])
GO
ALTER TABLE [dbo].[NewsletterTemplateKeys] CHECK CONSTRAINT [FK_NewsletterTemplateKeys_NewsletterKeyTypes]
GO

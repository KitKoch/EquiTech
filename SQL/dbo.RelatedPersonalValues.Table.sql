GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelatedPersonalValues](
	[PersonalValueA] [int] NOT NULL,
	[PersonalValueB] [int] NOT NULL,
 CONSTRAINT [PK_RelatedPersonalValues] PRIMARY KEY CLUSTERED 
(
	[PersonalValueA] ASC,
	[PersonalValueB] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[RelatedPersonalValues]  WITH CHECK ADD  CONSTRAINT [FK_RelatedPersonalValues_PersonalValues] FOREIGN KEY([PersonalValueA])
REFERENCES [dbo].[PersonalValues] ([Id])
GO
ALTER TABLE [dbo].[RelatedPersonalValues] CHECK CONSTRAINT [FK_RelatedPersonalValues_PersonalValues]
GO
ALTER TABLE [dbo].[RelatedPersonalValues]  WITH CHECK ADD  CONSTRAINT [FK_RelatedPersonalValues_PersonalValues1] FOREIGN KEY([PersonalValueB])
REFERENCES [dbo].[PersonalValues] ([Id])
GO
ALTER TABLE [dbo].[RelatedPersonalValues] CHECK CONSTRAINT [FK_RelatedPersonalValues_PersonalValues1]
GO

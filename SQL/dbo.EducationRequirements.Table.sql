GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EducationRequirements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[EducationLevelId] [int] NOT NULL,
	[DegreeId] [int] NULL,
	[OrganizationId] [int] NOT NULL,
	[IsExperienceAllowed] [bit] NOT NULL,
	[MinYears] [int] NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_EducationRequirements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EducationRequirements] ADD  CONSTRAINT [DF_EducationRequirements_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[EducationRequirements] ADD  CONSTRAINT [DF_EducationRequirements_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[EducationRequirements] ADD  CONSTRAINT [DF_EducationRequirements_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[EducationRequirements]  WITH CHECK ADD  CONSTRAINT [FK_EducationRequirements_Organizations] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([Id])
GO
ALTER TABLE [dbo].[EducationRequirements] CHECK CONSTRAINT [FK_EducationRequirements_Organizations]
GO
ALTER TABLE [dbo].[EducationRequirements]  WITH CHECK ADD  CONSTRAINT [FK_EducationRequirements_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[EducationRequirements] CHECK CONSTRAINT [FK_EducationRequirements_Users]
GO
ALTER TABLE [dbo].[EducationRequirements]  WITH CHECK ADD  CONSTRAINT [FK_EducationRequirements_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[EducationRequirements] CHECK CONSTRAINT [FK_EducationRequirements_Users1]
GO

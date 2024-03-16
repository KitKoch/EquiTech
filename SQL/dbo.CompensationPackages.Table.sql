GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompensationPackages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrgId] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[Description] [nvarchar](500) NOT NULL,
	[BaseSalary] [nvarchar](100) NULL,
 CONSTRAINT [PK_CompensationPackages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CompensationPackages] ADD  CONSTRAINT [DF_CompensationPackages_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[CompensationPackages] ADD  CONSTRAINT [DF_CompensationPackages_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[CompensationPackages] ADD  CONSTRAINT [DF_CompensationPackages_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[CompensationPackages]  WITH CHECK ADD  CONSTRAINT [FK_CompensationPackages_Organizations] FOREIGN KEY([OrgId])
REFERENCES [dbo].[Organizations] ([Id])
GO
ALTER TABLE [dbo].[CompensationPackages] CHECK CONSTRAINT [FK_CompensationPackages_Organizations]
GO

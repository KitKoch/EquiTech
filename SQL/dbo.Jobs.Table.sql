GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](4000) NOT NULL,
	[Requirements] [nvarchar](3000) NOT NULL,
	[JobTypeId] [int] NOT NULL,
	[JobStatusId] [int] NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[LocationId] [int] NOT NULL,
	[RemoteStatusId] [int] NOT NULL,
	[ContactName] [nvarchar](100) NOT NULL,
	[ContactPhone] [nvarchar](20) NULL,
	[ContactEmail] [nvarchar](200) NULL,
	[EstimatedStartDate] [datetime2](7) NULL,
	[EstimatedFinishDate] [datetime2](7) NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK_Jobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_EstimatedStartDate]  DEFAULT (getutcdate()) FOR [EstimatedStartDate]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_EstimateFInishDate]  DEFAULT (getutcdate()) FOR [EstimatedFinishDate]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT [FK_Jobs_Organizations] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([Id])
GO
ALTER TABLE [dbo].[Jobs] CHECK CONSTRAINT [FK_Jobs_Organizations]
GO

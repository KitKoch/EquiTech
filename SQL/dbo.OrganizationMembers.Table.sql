GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationMembers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[UserRoleId] [int] NOT NULL,
	[PositionType] [int] NOT NULL,
	[OrganizationEmail] [nvarchar](100) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_OrganizationMembers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[OrganizationMembers] ADD  CONSTRAINT [DF_OrganizationMembers_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[OrganizationMembers] ADD  CONSTRAINT [DF_OrganizationMembers_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[OrganizationMembers]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationMembers_OrganizationPositionTypes] FOREIGN KEY([PositionType])
REFERENCES [dbo].[OrganizationPositionTypes] ([Id])
GO
ALTER TABLE [dbo].[OrganizationMembers] CHECK CONSTRAINT [FK_OrganizationMembers_OrganizationPositionTypes]
GO
ALTER TABLE [dbo].[OrganizationMembers]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationMembers_Organizations] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([Id])
GO
ALTER TABLE [dbo].[OrganizationMembers] CHECK CONSTRAINT [FK_OrganizationMembers_Organizations]
GO
ALTER TABLE [dbo].[OrganizationMembers]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationMembers_Roles] FOREIGN KEY([UserRoleId])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[OrganizationMembers] CHECK CONSTRAINT [FK_OrganizationMembers_Roles]
GO
ALTER TABLE [dbo].[OrganizationMembers]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationMembers_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[OrganizationMembers] CHECK CONSTRAINT [FK_OrganizationMembers_Users]
GO

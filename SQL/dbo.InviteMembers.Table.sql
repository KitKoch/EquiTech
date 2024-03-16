GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InviteMembers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](255) NULL,
	[Token] [nvarchar](500) NULL,
	[UserRoleTypeId] [int] NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[ExpirationDate] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_InviteMembers_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[InviteMembers] ADD  CONSTRAINT [DF_InviteMembers_ExpirationDate]  DEFAULT (dateadd(day,(30),getutcdate())) FOR [ExpirationDate]
GO
ALTER TABLE [dbo].[InviteMembers] ADD  CONSTRAINT [DF_InviteMembers_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[InviteMembers]  WITH CHECK ADD  CONSTRAINT [FK_InviteMembers_Organizations] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([Id])
GO
ALTER TABLE [dbo].[InviteMembers] CHECK CONSTRAINT [FK_InviteMembers_Organizations]
GO
ALTER TABLE [dbo].[InviteMembers]  WITH CHECK ADD  CONSTRAINT [FK_InviteMembers_Roles] FOREIGN KEY([UserRoleTypeId])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[InviteMembers] CHECK CONSTRAINT [FK_InviteMembers_Roles]
GO
ALTER TABLE [dbo].[InviteMembers]  WITH CHECK ADD  CONSTRAINT [FK_InviteMembers_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[InviteMembers] CHECK CONSTRAINT [FK_InviteMembers_Users]
GO

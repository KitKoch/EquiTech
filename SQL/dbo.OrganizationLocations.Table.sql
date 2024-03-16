GO
/****** Object:  Table [dbo].[OrganizationLocations]    Script Date: 4/17/2023 9:30:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationLocations](
	[OrganizationId] [int] NOT NULL,
	[LocationId] [int] IDENTITY(1,1) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_OrganizationLocations] PRIMARY KEY CLUSTERED 
(
	[OrganizationId] ASC,
	[LocationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[OrganizationLocations] ADD  CONSTRAINT [DF_OrganizationLocations_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[OrganizationLocations]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationLocations_Locations] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[OrganizationLocations] CHECK CONSTRAINT [FK_OrganizationLocations_Locations]
GO
ALTER TABLE [dbo].[OrganizationLocations]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationLocations_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[OrganizationLocations] CHECK CONSTRAINT [FK_OrganizationLocations_Users]
GO

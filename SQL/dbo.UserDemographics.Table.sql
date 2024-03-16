GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDemographics](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PreferredName] [nvarchar](100) NULL,
	[Pronunciation] [nvarchar](100) NULL,
	[AboutMe] [nvarchar](100) NULL,
	[GenderId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_UserDemographics] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserDemographics] ADD  CONSTRAINT [DF_UserDemographics_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[UserDemographics] ADD  CONSTRAINT [DF_UserDemographics_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[UserDemographics]  WITH CHECK ADD  CONSTRAINT [FK_UserDemographics_GenderTypes] FOREIGN KEY([GenderId])
REFERENCES [dbo].[GenderTypes] ([Id])
GO
ALTER TABLE [dbo].[UserDemographics] CHECK CONSTRAINT [FK_UserDemographics_GenderTypes]
GO
ALTER TABLE [dbo].[UserDemographics]  WITH CHECK ADD  CONSTRAINT [FK_UserDemographics_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UserDemographics] CHECK CONSTRAINT [FK_UserDemographics_Users]
GO

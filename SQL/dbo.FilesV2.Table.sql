GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FilesV2](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Url] [nvarchar](255) NOT NULL,
	[FileTypeId] [int] NOT NULL,
	[FileSize] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[Downloaded] [int] NULL,
 CONSTRAINT [PK__FilesV2__3214EC078896BDF5] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[FilesV2] ADD  CONSTRAINT [DF_FilesV2_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[FilesV2] ADD  CONSTRAINT [DF__FilesV2__DateCre__6B64E1A4]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[FilesV2] ADD  CONSTRAINT [DF_FilesV2_Downloaded]  DEFAULT ((0)) FOR [Downloaded]
GO
ALTER TABLE [dbo].[FilesV2]  WITH CHECK ADD  CONSTRAINT [FK__FilesV2__Created__6D4D2A16] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[FilesV2] CHECK CONSTRAINT [FK__FilesV2__Created__6D4D2A16]
GO
ALTER TABLE [dbo].[FilesV2]  WITH CHECK ADD  CONSTRAINT [FK__FilesV2__FileTyp__6C5905DD] FOREIGN KEY([FileTypeId])
REFERENCES [dbo].[FileTypes] ([Id])
GO
ALTER TABLE [dbo].[FilesV2] CHECK CONSTRAINT [FK__FilesV2__FileTyp__6C5905DD]
GO
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompensationElements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompensationPackageId] [int] NOT NULL,
	[CompensationTypeId] [int] NOT NULL,
	[CompensationLabelId] [int] NOT NULL,
	[NumericValue] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_CompensationElements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CompensationElements] ADD  CONSTRAINT [DF_CompensationElements_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[CompensationElements] ADD  CONSTRAINT [DF_CompensationElements_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[CompensationElements]  WITH CHECK ADD  CONSTRAINT [FK_CompensationElements_CompensationLabels] FOREIGN KEY([CompensationLabelId])
REFERENCES [dbo].[CompensationLabels] ([Id])
GO
ALTER TABLE [dbo].[CompensationElements] CHECK CONSTRAINT [FK_CompensationElements_CompensationLabels]
GO
ALTER TABLE [dbo].[CompensationElements]  WITH CHECK ADD  CONSTRAINT [FK_CompensationElements_CompensationPackages] FOREIGN KEY([CompensationTypeId])
REFERENCES [dbo].[CompensationTypes] ([Id])
GO
ALTER TABLE [dbo].[CompensationElements] CHECK CONSTRAINT [FK_CompensationElements_CompensationPackages]
GO
ALTER TABLE [dbo].[CompensationElements]  WITH CHECK ADD  CONSTRAINT [FK_CompensationElements_CompensationPackages1] FOREIGN KEY([CompensationPackageId])
REFERENCES [dbo].[CompensationPackages] ([Id])
GO
ALTER TABLE [dbo].[CompensationElements] CHECK CONSTRAINT [FK_CompensationElements_CompensationPackages1]
GO

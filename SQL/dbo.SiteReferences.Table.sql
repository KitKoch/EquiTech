GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SiteReferences](
	[ReferenceTypeId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_SiteReferences] PRIMARY KEY CLUSTERED 
(
	[ReferenceTypeId] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

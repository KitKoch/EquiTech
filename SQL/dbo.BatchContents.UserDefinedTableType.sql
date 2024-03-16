GO

CREATE TYPE [dbo].[BatchContents] AS TABLE(
	[Value] [nvarchar](4000) NOT NULL,
	[TemplateKeyId] [int] NOT NULL
)
GO

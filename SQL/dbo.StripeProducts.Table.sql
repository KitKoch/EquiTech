GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StripeProducts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [nvarchar](50) NOT NULL,
	[PriceId] [nvarchar](50) NOT NULL,
	[Amount] [float] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_StripeProducts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
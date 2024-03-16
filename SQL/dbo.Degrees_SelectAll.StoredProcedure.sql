GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	CREATE PROC [dbo].[Degrees_SelectAll]

	as
/*------------ TEST CODE ------------

		EXECUTE dbo.Degrees_SelectAll

*/
	BEGIN

			SELECT [Id]
				  ,[Name]
			  FROM [dbo].[Degrees]
			  ORDER BY [Name] ASC

	END
GO

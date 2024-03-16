GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[FAQs_Delete_ById]
		@Id int

AS

/*

DECLARE @Id int = 3

Select *
From dbo.FAQs
WHERE Id = @Id

EXECUTE dbo.FAQs_Delete_ById @Id

Select * 
From dbo.FAQs
WHERE Id = @Id

*/

BEGIN

	DELETE FROM [dbo].[FAQs]
		WHERE Id = @Id

END


GO

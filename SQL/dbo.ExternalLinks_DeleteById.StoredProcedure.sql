GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ExternalLinks_DeleteById]
		@Id int

AS

/**-----Test Code----


Declare @Id int = 10
Execute dbo.ExternalLinks_DeleteById @Id

select *
From dbo.externallinks


*/
BEGIN
  
    DELETE FROM [dbo].[ExternalLinks]
    WHERE Id = @Id;

END
GO

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Forums_Delete]
    @Id int
AS
/*
DECLARE @Id int = 4

EXECUTE [dbo].[Forums_Delete] @Id
select * 
from dbo.Forums
*/
BEGIN
    DECLARE @IsClosed bit = 1
    DECLARE @DateUpdated datetime2(7) = GETDATE()

    UPDATE dbo.Forums 
    SET IsClosed = @IsClosed,
        DateModified = @DateUpdated
    WHERE Id = @Id
END
GO

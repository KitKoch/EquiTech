GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[CompensationPackages_Delete]
    @Id INT
AS
/*

EXECUTE [dbo].[CompensationPackages_UpdateIsDeleted] @Id = 3

Select *
From dbo.CompensationPackages

*/


BEGIN
    UPDATE [dbo].[CompensationPackages]
    SET IsDeleted = 1
    WHERE [Id] = @Id
END
GO

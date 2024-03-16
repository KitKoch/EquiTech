GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SiteReferences_Insert]
@RefTypeId int,
@UserId int
as 
/*
declare @RefTypeId int = 8,
		@UserId int = 7
		execute dbo.SiteReferences_Insert
		@RefTypeId
           ,@UserId
*/

begin

INSERT INTO [dbo].[SiteReferences]
           ([ReferenceTypeId]
           ,[UserId])
     VALUES
           (@RefTypeId
           ,@UserId)


End
GO

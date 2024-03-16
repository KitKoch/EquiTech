GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Comments_Select_ByEntityId]
				 @EntityId int
				 ,@EntityTypeId int

as

/* ------TEST CODE-------

Declare @EntityId int = 3
	   ,@EntityTypeId int = 2

Execute [dbo].[Comments_Select_ByEntityId] 
				@EntityId
				,@EntityTypeId

SELECT * FROM  [dbo].[Comments] 
*/
 
BEGIN

	
SELECT c.Id 
      ,c.[Subject]
	  ,c.[Text]
	  ,c.ParentId
	  ,c.EntityTypeId
	  ,et.[Name]
	  ,c.EntityId
	  ,c.DateCreated
	  ,c.DateModified
	  ,c.CreatedBy
	  ,u.FirstName
	  ,u.LastName
	  ,u.Mi
	  ,u.AvatarUrl
	  ,c.IsDeleted

    FROM [dbo].[Comments] c 
	inner join [dbo].[EntityTypes] as et
			on c.EntityTypeId = et.Id 
	inner join Users u on 
			u.Id = c.CreatedBy 


	Where c.EntityTypeId = @EntityTypeId
		and c.EntityId = @EntityId



END
GO

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[ExternalLinks_InsertV2]
					@UserId int
					,@UrlTypeId int
					,@Url nvarchar(255)
					,@EntityId int
					,@EntityTypeId int
					,@Id int OUTPUT
					
as

/*

Declare 
		@UserId int = 205
		,@UrlTypeId int= 3
		,@Url nvarchar(255)= 'www.testing.com/home'
		,@EntityId int= 0
		,@EntityTypeId int= 0
		,@Id int = 0

Execute [dbo].[ExternalLinks_Insert]
					@UserId 
					,@UrlTypeId 
					,@Url 
					,@EntityId 
					,@EntityTypeId 
					,@Id = @Id OUTPUT


Select *
from dbo.externalLinks

select *
from dbo.Urltypes

Select *
from dbo.users
				
*/


BEGIN

INSERT INTO [dbo].[ExternalLinks]
           ([UserId]
      ,[UrlTypeId]
      ,[Url]
      ,[EntityId]
      ,[EntityTypeId]  )
     VALUES
           (
					@UserId 
					,@UrlTypeId 
					,@Url 
					,CASE WHEN @EntityId = 0 THEN NULL ELSE @EntityId END
					,CASE WHEN @EntityTypeId = 0 THEN NULL ELSE @EntityTypeId END
			)
			Set @Id = SCOPE_IDENTITY();

END
GO

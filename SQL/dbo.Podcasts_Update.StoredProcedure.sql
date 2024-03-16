GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Podcasts_Update]
@Title nvarchar(50),
@Description nvarchar(200),
@Url nvarchar(200),
@PodcastTypeId int,
@CoverImageUrl nvarchar(200),
@ModifiedBy int,
@Id int 
as
/*
declare @Id int = 14,
		@Title nvarchar(50) = 'new test title',
		@Description nvarchar(200) = 'new test desctiption',
		@Url nvarchar(200) = 'new test url',
		@PodcastTypeId int = 2,
		@CoverImageUrl nvarchar(200) = 'new test coverimageurl',
		@ModifiedBy int = 6 
execute Podcasts_SelectAll_Page
1,5
execute dbo.Podcasts_Update
			@Title,
			@Description,
			@Url,
			@PodcastTypeId,
			@CoverImageUrl,
			@ModifiedBy,
			@Id
execute Podcasts_SelectAll_Page
1,5
*/
begin 


UPDATE [dbo].[Podcasts]
   SET [Title] = @Title
      ,[Description] = @Description
      ,[Url] = @Url
      ,[PodcastTypeId] = @PodcastTypeId
      ,[CoverImageUrl] = @CoverImageUrl
	  ,[DateModified] = getutcDate()
      ,[ModifiedBy] = @ModifiedBy
 WHERE Id = @Id




end
GO

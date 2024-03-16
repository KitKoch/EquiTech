GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Podcasts_Insert]
@Title nvarchar(50),
@Description nvarchar(200),
@Url nvarchar(200),
@PodcastTypeId int,
@CoverImageUrl nvarchar(200),
@CreatedBy int,
@ModifiedBy int,
@Id int OUTPUT
as
/*
declare @Id int = 0,
		@Title nvarchar(50) = 'test title',
		@Description nvarchar(200) = 'test desctiption',
		@Url nvarchar(200) = 'test url',
		@PodcastTypeId int = 2,
		@CoverImageUrl nvarchar(200) = 'test coverimageurl',
		@CreatedBy int = 6,
		@ModifiedBy int = 6 
execute Podcasts_SelectAll_Page
0,5
execute dbo.Podcasts_Insert
			@Title,
			@Description,
			@Url,
			@PodcastTypeId,
			@CoverImageUrl,
			@CreatedBy,
			@ModifiedBy,
			@Id OUTPUT
execute Podcasts_SelectAll_Page
0,5
*/
begin 


INSERT INTO [dbo].[Podcasts]
           ([Title]
           ,[Description]
           ,[Url]
           ,[PodcastTypeId]
           ,[CoverImageUrl]
           ,[CreatedBy]
           ,[ModifiedBy])
     VALUES
           (@Title,
			@Description,
			@Url,
			@PodcastTypeId,
			@CoverImageUrl,
			@CreatedBy,
			@ModifiedBy)
	set @Id = Scope_Identity()

end
GO

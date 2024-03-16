GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[PodcastTypes_SelectAll]

as
/*
execute dbo.PodcastTypes_SelectAll
*/
begin

SELECT [Id]
      ,[Name]
  FROM [dbo].[PodcastTypes]


end
GO

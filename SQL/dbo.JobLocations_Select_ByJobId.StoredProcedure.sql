GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[JobLocations_Select_ByJobId]

		@JobId int


/*--test---

		declare @JobId int = 5

		execute [dbo].[JobLocations_Select_ByJobId]

		@JobId
	

*/
as

begin

	SELECT 


			jl.[JobId]
			,j.[Title]
			,j.[Description]
			,j.[Requirements]
			,j.[ContactName]
			,j.[ContactPhone]
			,j.[ContactEmail]
			,j.[EstimatedStartDate]
			,j.[EstimatedFinishDate]
			,j.[DateCreated]

			,[Locations] = (
			
					SELECT

					JSON_QUERY ((

						SELECT

						lt.[Id]
						,lt.[Name]

						FROM [dbo].[JobLocations] as jl inner join [dbo].[Locations] as l
								on jl.[LocationId] = l.[Id]
							inner join [dbo].[LocationTypes] as lt
								on l.[LocationTypeId] = lt.[Id]

						WHERE jl.[JobId] = @JobId   
						For JSON AUTO,
						WITHOUT_ARRAY_WRAPPER

					)) as [LocationType]

					,l.[Id]
					,l.[LineOne]
					,l.[LineTwo]
					,l.[City]
					,l.[StateId]
					
					,JSON_QUERY ((

						SELECT

						s.[Id]
						,s.[Name]
						,s.[Code] as [Col3]

						FROM [dbo].[JobLocations] as jl inner join [dbo].[Locations] as l
								on jl.[LocationId] = l.[Id]
							inner join [dbo].[States] as s
								on l.[StateId] = s.[Id]

						WHERE jl.[JobId] = @JobId 
						For JSON AUTO,
						WITHOUT_ARRAY_WRAPPER

					)) as [State]

					,l.[Latitude]
					,l.[Longitude]
					,l.[DateCreated]
					,l.[DateModified]


					FROM [dbo].[JobLocations] as jl inner join [dbo].[Locations] as l
							on jl.[LocationId] = l.Id

					WHERE jl.[JobId] = @JobId  
					For JSON AUTO
			)
			

		FROM [dbo].[JobLocations] as jl inner join [dbo].[Jobs] as j
				on jl.[LocationId] = j.Id

		WHERE jl.[JobId] = @JobId  


end
GO

import { QueryFilterBuilder } from '../../services/query-filter-builder.service';
import { paginate, findOne } from '../../services/repository.service';
import { filterByName, autocompleteName } from '../../services/beer.service';
import { Beer } from '../../models/beer';
import { Query } from 'mongoose';
import { BeerDocument } from 'src/interfaces/beer';


jest.mock('../../services/repository.service');

const mockPaginate = paginate as jest.MockedFunction<typeof paginate>;
const mockFindOne = findOne as jest.MockedFunction<typeof findOne>;

describe('Beer service', () => {

    describe('filterByName', () => {
        
        it('should call paginate method with the right params!', () => {
            const data = { 
                name: 'name', 
                page: 'page', 
                size: 'size', 
                select: 'select', 
                sort: 'sort', 
                order: 'order' 
            };
            
            const queryFilterBuilder: QueryFilterBuilder = new QueryFilterBuilder();
            queryFilterBuilder.build = jest.fn().mockReturnValue({});
            const spyRegex = jest.spyOn(queryFilterBuilder, 'setRegexFilter');

            filterByName(data, queryFilterBuilder);
            
            expect(spyRegex).toHaveBeenCalledTimes(4);
            expect(queryFilterBuilder.build).toHaveBeenCalledTimes(1);
            expect(mockPaginate).toHaveBeenCalledWith(Beer, { page: data.page, size: data.size, select: data.select, sort: data.sort, order: data.order}, {});
        });
    });

    describe('autocompleteName', () => {
        let queryFilterBuilder: QueryFilterBuilder;
        let composedOrQuery = {};

        beforeEach(() => {
            queryFilterBuilder = new QueryFilterBuilder();
            composedOrQuery = {}
            queryFilterBuilder.build = jest.fn().mockReturnValue(composedOrQuery);
        });

        it('should throw an error the autocomplete fuction!', async () => {
            const nameToAutocomplete = 'xyz';
           
            mockFindOne.mockImplementation(() => {throw new Error('unknown')});

            await expect(autocompleteName(nameToAutocomplete, queryFilterBuilder)).rejects.toThrow();            
        });
        
        it('should be a beer object!', async () => {
            const nameToAutocomplete = 'beer';
            const foundedBeer = {
                name: 'beer'
            };
            mockFindOne.mockReturnValue(foundedBeer as unknown as Query<any,any>);

            const autocompleteResponse = await autocompleteName(nameToAutocomplete, queryFilterBuilder);
            
            expect(findOne).toHaveBeenCalledWith(Beer, composedOrQuery);
            expect(autocompleteResponse).toMatchObject({beer: 'beer'});
        });

        it('should be a malt ingredient!', async () => {
            const nameToAutocomplete = 'malt';
            const foundedBeer = {
                name: 'beer',
                ingredients: {
                    malt: [
                        {
                            name: 'malt'
                        }
                    ]
                }
            };
            mockFindOne.mockReturnValue(foundedBeer as unknown as Query<any,any>);

            const autocompleteResponse = await autocompleteName(nameToAutocomplete, queryFilterBuilder);
            
            expect(autocompleteResponse).toMatchObject({malt: 'malt'});
        });

        it('should be a yeast ingredient!', async () => {
            const nameToAutocomplete = 'yeast';
            const foundedBeer = {
                name: 'beer',
                ingredients: {
                    
                    yeast: 'yeast'
                }
            };
            mockFindOne.mockReturnValue(foundedBeer as unknown as Query<any,any>);

            const autocompleteResponse = await autocompleteName(nameToAutocomplete, queryFilterBuilder);
            
            expect(autocompleteResponse).toMatchObject({yeast: 'yeast'});
        });

        it('should return an empty string if no matching string is found!', async () => {
            const nameToAutocomplete = 'xyz';
            const foundedBeer = {
                name: 'beer',
                ingredients: {
                    malt: [{ name: 'malt'}],
                    hops: [{ name: 'hops'}],
                    yeast: 'yeast'
                }
            };
            mockFindOne.mockReturnValue(foundedBeer as unknown as Query<any,any>);

            const autocompleteResponse = await autocompleteName(nameToAutocomplete, queryFilterBuilder);
            
            expect(autocompleteResponse).toBe('');
        });

        it('should return an empty string if no beer is found!', async () => {
            const nameToAutocomplete = 'xyz';
            const foundedBeer = null;

            mockFindOne.mockReturnValue(foundedBeer as unknown as Query<any,any>);

            const autocompleteResponse = await autocompleteName(nameToAutocomplete, queryFilterBuilder);
            
            expect(autocompleteResponse).toBe('');
        });
    })
})
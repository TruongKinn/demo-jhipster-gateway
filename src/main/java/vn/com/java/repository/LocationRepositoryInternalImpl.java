package vn.com.java.repository;

import static org.springframework.data.relational.core.query.Criteria.where;

import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.BiFunction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoinCondition;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.com.java.domain.Location;
import vn.com.java.repository.rowmapper.CountryRowMapper;
import vn.com.java.repository.rowmapper.LocationRowMapper;

/**
 * Spring Data SQL reactive custom repository implementation for the Location entity.
 */
@SuppressWarnings("unused")
class LocationRepositoryInternalImpl extends SimpleR2dbcRepository<Location, Long> implements LocationRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final CountryRowMapper countryMapper;
    private final LocationRowMapper locationMapper;

    private static final Table entityTable = Table.aliased("location", EntityManager.ENTITY_ALIAS);
    private static final Table countryTable = Table.aliased("country", "country");

    public LocationRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        CountryRowMapper countryMapper,
        LocationRowMapper locationMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Location.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.countryMapper = countryMapper;
        this.locationMapper = locationMapper;
    }

    @Override
    public Flux<Location> findAllBy(Pageable pageable) {
        return findAllBy(pageable, null);
    }

    @Override
    public Flux<Location> findAllBy(Pageable pageable, Criteria criteria) {
        return createQuery(pageable, criteria).all();
    }

    RowsFetchSpec<Location> createQuery(Pageable pageable, Criteria criteria) {
        List<Expression> columns = LocationSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(CountrySqlHelper.getColumns(countryTable, "country"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(countryTable)
            .on(Column.create("country_id", entityTable))
            .equals(Column.create("id", countryTable));

        String select = entityManager.createSelect(selectFrom, Location.class, pageable, criteria);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Location> findAll() {
        return findAllBy(null, null);
    }

    @Override
    public Mono<Location> findById(Long id) {
        return createQuery(null, where(EntityManager.ENTITY_ALIAS + ".id").is(id)).one();
    }

    private Location process(Row row, RowMetadata metadata) {
        Location entity = locationMapper.apply(row, "e");
        entity.setCountry(countryMapper.apply(row, "country"));
        return entity;
    }

    @Override
    public <S extends Location> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
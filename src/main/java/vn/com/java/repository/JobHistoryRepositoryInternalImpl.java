package vn.com.java.repository;

import static org.springframework.data.relational.core.query.Criteria.where;

import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.time.Instant;
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
import vn.com.java.domain.JobHistory;
import vn.com.java.domain.enumeration.Language;
import vn.com.java.repository.rowmapper.DepartmentRowMapper;
import vn.com.java.repository.rowmapper.EmployeeRowMapper;
import vn.com.java.repository.rowmapper.JobHistoryRowMapper;
import vn.com.java.repository.rowmapper.JobRowMapper;

/**
 * Spring Data SQL reactive custom repository implementation for the JobHistory entity.
 */
@SuppressWarnings("unused")
class JobHistoryRepositoryInternalImpl extends SimpleR2dbcRepository<JobHistory, Long> implements JobHistoryRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final JobRowMapper jobMapper;
    private final DepartmentRowMapper departmentMapper;
    private final EmployeeRowMapper employeeMapper;
    private final JobHistoryRowMapper jobhistoryMapper;

    private static final Table entityTable = Table.aliased("job_history", EntityManager.ENTITY_ALIAS);
    private static final Table jobTable = Table.aliased("job", "job");
    private static final Table departmentTable = Table.aliased("department", "department");
    private static final Table employeeTable = Table.aliased("employee", "employee");

    public JobHistoryRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        JobRowMapper jobMapper,
        DepartmentRowMapper departmentMapper,
        EmployeeRowMapper employeeMapper,
        JobHistoryRowMapper jobhistoryMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(JobHistory.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.jobMapper = jobMapper;
        this.departmentMapper = departmentMapper;
        this.employeeMapper = employeeMapper;
        this.jobhistoryMapper = jobhistoryMapper;
    }

    @Override
    public Flux<JobHistory> findAllBy(Pageable pageable) {
        return findAllBy(pageable, null);
    }

    @Override
    public Flux<JobHistory> findAllBy(Pageable pageable, Criteria criteria) {
        return createQuery(pageable, criteria).all();
    }

    RowsFetchSpec<JobHistory> createQuery(Pageable pageable, Criteria criteria) {
        List<Expression> columns = JobHistorySqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(JobSqlHelper.getColumns(jobTable, "job"));
        columns.addAll(DepartmentSqlHelper.getColumns(departmentTable, "department"));
        columns.addAll(EmployeeSqlHelper.getColumns(employeeTable, "employee"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(jobTable)
            .on(Column.create("job_id", entityTable))
            .equals(Column.create("id", jobTable))
            .leftOuterJoin(departmentTable)
            .on(Column.create("department_id", entityTable))
            .equals(Column.create("id", departmentTable))
            .leftOuterJoin(employeeTable)
            .on(Column.create("employee_id", entityTable))
            .equals(Column.create("id", employeeTable));

        String select = entityManager.createSelect(selectFrom, JobHistory.class, pageable, criteria);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<JobHistory> findAll() {
        return findAllBy(null, null);
    }

    @Override
    public Mono<JobHistory> findById(Long id) {
        return createQuery(null, where(EntityManager.ENTITY_ALIAS + ".id").is(id)).one();
    }

    private JobHistory process(Row row, RowMetadata metadata) {
        JobHistory entity = jobhistoryMapper.apply(row, "e");
        entity.setJob(jobMapper.apply(row, "job"));
        entity.setDepartment(departmentMapper.apply(row, "department"));
        entity.setEmployee(employeeMapper.apply(row, "employee"));
        return entity;
    }

    @Override
    public <S extends JobHistory> Mono<S> save(S entity) {
        return super.save(entity);
    }
}

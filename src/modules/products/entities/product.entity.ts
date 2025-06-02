import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index, BeforeInsert} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity('products')
export class Product {
    @PrimaryColumn('uuid')
    id: string;

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = uuid();
        }

    }

    @Index({ unique: true })
    @Column({type: 'varchar', length: 100, nullable: false})
    name: string;

    @Column('decimal',{precision: 10, scale: 2, nullable: false})
    price: number;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}